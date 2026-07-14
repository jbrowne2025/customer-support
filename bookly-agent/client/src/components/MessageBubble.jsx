function ToolBadge({ call }) {
  const label = {
    lookup_order: 'Looked up order',
    initiate_return: 'Processed return',
    search_policies: 'Searched policies',
  }[call.name] || call.name;

  return (
    <div className="tool-badge" title={JSON.stringify(call.input)}>
      🔧 {label}
    </div>
  );
}

export default function MessageBubble({ role, text, toolCalls }) {
  return (
    <div className={`bubble-row ${role}`}>
      <div className="bubble">
        {toolCalls && toolCalls.length > 0 && (
          <div className="tool-badges">
            {toolCalls.map((call, i) => (
              <ToolBadge key={i} call={call} />
            ))}
          </div>
        )}
        <div className="bubble-text">{text}</div>
      </div>
    </div>
  );
}
