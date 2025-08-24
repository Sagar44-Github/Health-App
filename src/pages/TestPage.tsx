export default function TestPage() {
  console.log("TestPage rendering...");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ef4444",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "3rem",
        fontWeight: "bold",
      }}
    >
      TEST PAGE - RENDERING WORKS!
      <br />
      Check console for logs
    </div>
  );
}
