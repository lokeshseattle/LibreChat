# MCP Function Calling Integration Analysis

## Current Situation

### Data Flow Architecture

1. **ChatForm** → **BadgeRow** → **ToolsDropdown** → **MCPSubMenu**
2. **Conversation data** flows through `useChatContext()` which provides access to current conversation including `endpoint` and `model`
3. **MCPSubMenu** currently only checks if MCP servers are configured, not model capabilities

### Key Components

#### 1. Model Settings (schemas.ts)

- Contains model-specific settings with `supportsFunctionCalling` property
- Different OpenAI models have different function calling capabilities:
  - **GPT-5**: `supportsFunctionCalling: true`
  - **GPT-5-mini**: `supportsFunctionCalling: true`
  - **GPT-5-nano**: `supportsFunctionCalling: true`
  - **GPT-5-chat-latest**: `supportsFunctionCalling: false`
  - **GPT-4o**: `supportsFunctionCalling: true`
  - **ChatGPT-4o-latest**: `supportsFunctionCalling: true`
  - **GPT-4o-mini**: `supportsFunctionCalling: true`

#### 2. Current MCP Logic (MCPSubMenu.tsx)

```typescript
// Current logic - only checks if servers are configured
if (!configuredServers || configuredServers.length === 0) {
  return null;
}
```

#### 3. Data Access Points

- **ChatForm**: Has access to `conversation` object via `useChatContext()`
- **BadgeRowProvider**: Receives `conversationId` and `isSubmitting`
- **ToolsDropdown**: Uses `useBadgeRowContext()` but doesn't have direct model access
- **MCPSubMenu**: Currently has no access to model information

### Helper Functions Available

- `getModelSettings(endpoint, model)`: Returns model-specific settings
- `getOpenAIModelCategory(model)`: Categorizes OpenAI models
- `getModelKey(endpoint, model)`: Gets model key for settings lookup

## Implementation Plan

### Phase 1: Add Model Context to MCPSubMenu

1. **Modify ToolsDropdown** to pass model information to MCPSubMenu
2. **Update MCPSubMenu props** to receive endpoint and model
3. **Add conditional logic** to check both server configuration AND function calling support

### Phase 2: Update Data Flow

1. **ChatForm** already has conversation data
2. **BadgeRowProvider** needs to pass model info through context
3. **ToolsDropdown** needs to access and forward model data
4. **MCPSubMenu** needs to use model data for conditional rendering

### Phase 3: Implementation Details

#### Modified MCPSubMenu Logic:

```typescript
// New logic - check both servers AND model capabilities
const shouldShowMCP = useMemo(() => {
  if (!configuredServers || configuredServers.length === 0) {
    return false;
  }

  if (!endpoint || !model) {
    return false;
  }

  const modelSettings = getModelSettings(endpoint, model);
  return modelSettings.supportsFunctionCalling === true;
}, [configuredServers, endpoint, model]);

if (!shouldShowMCP) {
  return null;
}
```

## Files to Modify

1. **BadgeRowContext.tsx**: Add model/endpoint to context
2. **ToolsDropdown.tsx**: Access and pass model data to MCPSubMenu
3. **MCPSubMenu.tsx**: Add model checking logic
4. **parameterSettings.ts**: Import and use model settings functions

## Benefits

- **Prevents confusion**: Users won't see MCP options for models that don't support function calling
- **Better UX**: Clear indication of when MCP is available
- **Consistent behavior**: Aligns with model capabilities
- **Future-proof**: Easy to extend for other model providers

## Technical Considerations

- **Performance**: Model settings lookup is lightweight
- **Backward compatibility**: Graceful fallback if model info unavailable
- **Error handling**: Handle cases where model settings are undefined
- **Type safety**: Proper TypeScript types for new props

## Next Steps

1. Get confirmation on approach
2. Implement changes in order of data flow
3. Test with different model types
4. Verify MCP functionality still works for supported models
