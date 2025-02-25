type OutputDisplayProps = {
  output: string | null;
};

export function OutputDisplay({ output }: OutputDisplayProps) {
  return (
    <div className="p-6 bg-gray-50 rounded-md shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Generated Copy</h2>
      {output ? (
        <p className="whitespace-pre-line">{output}</p>
      ) : (
        <p className="text-gray-500">No content generated yet.</p>
      )}
    </div>
  );
}
