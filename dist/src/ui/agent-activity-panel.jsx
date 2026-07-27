export function AgentActivityPanel({ items }) {
    return (<aside className="panel panel--activity">
      <div className="panel__header">
        <div>
          <p className="section-label">Agent activity</p>
          <h2>Coordination log</h2>
        </div>
        <div className="status-pill">Human-in-the-loop</div>
      </div>

      <div className="activity-list">
        {items.map((item) => (<article className="activity-item" key={`${item.title}-${item.timestamp}`}>
            <div className="activity-item__title">
              <strong>{item.title}</strong>
              <span className="activity-item__meta">{item.timestamp}</span>
            </div>
            <div className="activity-dot"/>
            <p>{item.detail}</p>
          </article>))}
      </div>
    </aside>);
}
