export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ backgroundColor: "red"}}>
      <h3>This is the notes layout</h3>
      {children}
      <div style={{height: 100}}>
        <p>This is some text from the notes layout</p>
      </div>
    </div>
  );
}
