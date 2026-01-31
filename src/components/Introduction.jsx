function Introduction() {
  const name = "Alex Benson";
  const bio = "This website is a smaller-scale recreation of Bulbapedia for my CGT Individual Project";
  const email = "benso122@purdue.brightspace.com";

  return (
    <section className="intro">
      <h2 className="intro-heading">Introduction</h2>
      <p className="intro-text">
        Hi, my name is {name}. {bio}
      </p>
      <p className="intro-contact">
        Contact:{" "}
        <a className="intro-link" href={`mailto:${email}`}>
          {email}
        </a>
      </p>
    </section>
  );
}

export default Introduction;