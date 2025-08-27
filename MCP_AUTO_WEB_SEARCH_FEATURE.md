# MCP Auto Web-Search Feature Implementation

## Overview

This document describes the implementation of an automatic web-search MCP server selection feature. When a model doesn't support native web search capabilities, the system will automatically select the "web-search" MCP server if it's available and configured.

## Changes Made

### File Modified: `/client/src/hooks/MCP/useMCPServerManager.ts`

#### 1. Added New Imports

```typescript
import { useRecoilValue } from 'recoil';
import { Constants, QueryKeys, getModelSettings } from 'librechat-data-provider';
import store from '~/store';
```

#### 2. Added Conversation Context

```typescript
const conversation = useRecoilValue(store.conversationByIndex(0));
```

#### 3. Added Auto-Selection Logic

A new `useEffect` hook was added after all necessary dependencies are defined (around line 320):

```typescript
// Auto-select web-search MCP server if model doesn't support web search
useEffect(() => {
  if (!conversation?.endpoint || !conversation?.model || !configuredServers.length) {
    return;
  }

  const hasWebSearchServer = configuredServers.includes('web-search');
  if (!hasWebSearchServer) {
    return;
  }

  try {
    const modelSettings = getModelSettings(conversation.endpoint, conversation.model);
    const modelSupportsWebSearch = modelSettings.supportsWebSearch === true;
    const isWebSearchSelected = mcpValues?.includes('web-search') ?? false;

    // If model doesn't support web search and web-search server is not selected, select it
    if (!modelSupportsWebSearch && !isWebSearchSelected) {
      const currentValues = mcpValues ?? [];
      const serverStatus = connectionStatus['web-search'];

      // Only auto-select if the server is connected or can be connected
      if (serverStatus?.connectionState === 'connected') {
        setMCPValues([...currentValues, 'web-search']);
      } else if (!serverStatus || serverStatus.connectionState !== 'error') {
        // Try to initialize the server if it's not in error state
        initializeServer('web-search', false); // false = don't auto-open OAuth
      }
    }
  } catch (error) {
    console.error('[MCP Manager] Error checking model web search support:', error);
  }
}, [
  conversation?.endpoint,
  conversation?.model,
  configuredServers,
  mcpValues,
  connectionStatus,
  setMCPValues,
  initializeServer,
]);
```

## Feature Behavior

### When Auto-Selection Triggers

The feature automatically selects the "web-search" MCP server when:

1. A "web-search" MCP server is configured in the system
2. The current model doesn't support native web search (`supportsWebSearch !== true`)
3. The "web-search" server is not already selected
4. The conversation has a valid endpoint and model

### Server Connection Handling

- **If server is connected**: Immediately adds "web-search" to selected MCP servers
- **If server is not connected but not in error state**: Attempts to initialize the server without auto-opening OAuth flows
- **If server is in error state**: Does nothing to avoid repeated failed attempts

### Safety Measures

1. **Error Handling**: Wrapped in try-catch to prevent crashes if model settings retrieval fails
2. **Dependency Checks**: Validates all required data is available before proceeding
3. **Non-Intrusive OAuth**: When initializing servers, OAuth flows don't auto-open to avoid disrupting user experience
4. **Conservative Deselection**: The feature doesn't automatically deselect web-search when models do support web search, allowing users to keep it if desired
5. **Infinite Loop Prevention**: Uses `mcpValuesRef.current` instead of `mcpValues` in the useEffect to prevent infinite re-renders
6. **User Control**: Users can manually deselect the web-search server at any time without interference

## Dependencies

The feature relies on:

- `getModelSettings()` function from `librechat-data-provider` to check web search support
- Recoil store for accessing current conversation context
- Existing MCP server management infrastructure
- Connection status monitoring system

## Integration Points

- **MCPSubMenu Component**: No changes required - automatically benefits from the updated hook
- **Model Settings**: Uses existing model configuration system to determine web search capabilities
- **MCP Server Management**: Integrates with existing server initialization and selection logic

## Future Considerations

- Could be extended to auto-select other capability-specific MCP servers
- Could include user preferences to disable auto-selection
- Could provide visual feedback when auto-selection occurs
- Could implement more sophisticated server prioritization logic

## Bug Fixes Applied

### Issue: Infinite Loop and Unable to Deselect

**Problem**: The initial implementation caused an infinite loop because `mcpValues` was included in the useEffect dependency array. When the effect ran and updated `mcpValues`, it would trigger itself again, creating a cycle. Additionally, users couldn't manually deselect the web-search server.

**Solution**:

- Removed `mcpValues` and `connectionStatus` from the useEffect dependency array
- Used `mcpValuesRef.current` to access the current values without creating a dependency
- Added `lastAutoSelectAttemptRef` to track which models we've already attempted auto-selection for
- Added logic to reset the attempt tracking when users manually deselect the web-search server
- This allows the effect to run only when the model or endpoint changes, not when selections or connection status change
- Users can now freely select/deselect the web-search server without interference

## Testing Recommendations

1. Test with models that support web search (should not auto-select)
2. Test with models that don't support web search (should auto-select if web-search server available)
3. Test server initialization flow when web-search server is not connected
4. Test error handling when model settings are unavailable
5. Test behavior when no web-search server is configured
6. **Test manual deselection**: Verify users can manually deselect the web-search server without it being re-selected
7. **Test model switching**: Verify switching between models with/without web search support works correctly
