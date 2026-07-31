function KnowledgeSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar conocimiento"
      value={value || ""}
      onChange={onChange}
      className="knowledge-search"
    />
  );
}

export default KnowledgeSearch;
