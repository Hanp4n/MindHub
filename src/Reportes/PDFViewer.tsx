type Props = {
  pdfUrl: string | null;
  width?: string | number;
  height?: string | number;
};

export default function PDFViewer({
  pdfUrl,
  width = "600px",
  height = "800px"
}: Props) {
  if (!pdfUrl) {
    return <p>No hay PDF cargado</p>;
  }

  return (
    <iframe
      src={pdfUrl}
      style={{
        width,
        height,
        border: "1px solid #ccc",
        borderRadius: "8px"
      }}
    />
  );
}
