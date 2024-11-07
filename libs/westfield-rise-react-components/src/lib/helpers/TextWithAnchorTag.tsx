function TextWithAnchorTag({ content }: { content: string }) {
  const myRegexp = new RegExp("^(.*)(<a\\shref\\=\\'(.+)\\'>)(.+)<\\/a>(.*)$", "g");
  const matches = myRegexp.exec(content);
  return (
    <span>
      {matches && matches.length > 0 ? (
        <>
          {matches[1]}<a href={matches[3]} target="_blank" rel="noopener noreferrer">{matches[4]}</a>{matches[5]}
        </>
      ) : (
        content
      )
      }
    </span>
  );
}

export default TextWithAnchorTag