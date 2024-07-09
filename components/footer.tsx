import React from "react";

const Footer = () => {
  const footerLinks = [
    {
      name: "Quick Links ",
      links: [
        { name: "Home", url: "/" },
        { name: "Categories", url: "/" },
        { name: "Contact Us", url: "/" },
      ],
    },
    {
      name: "Social Media",
      links: [
        { name: "Facebook", url: "/" },
        { name: "Twitter", url: "/" },
        { name: "Instagram", url: "/" },
      ],
    },
    {
      name: "Terms and conditions",
      links: [
        { name: "Facebook", url: "/" },
        { name: "Twitter", url: "/" },
        { name: "Instagram", url: "/" },
      ],
    },
  ];
  return (
    <div className="md:mt-12 mt-6 border-t py-3">
      <footer className="container">
        <h2 className="text-lg font-bold py-3">Rojgarseeker</h2>
        <div className="grid md:grid-cols-3">
          {footerLinks.map((footerLink, index: number) => (
            <div key={index}>
              <h3 className="text-muted-foreground mt-3 font-medium mb-2">
                {footerLink.name}
              </h3>
              <ul className="ml-1">
                {footerLink.links.map((link, j: number) => (
                  <li
                    key={j}
                    className="text-sm text-muted-foreground hover:underline  mb-1"
                  >
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pb-3 pt-6 text-center">
          <p className="text-sm text-muted-foreground">CopyRight </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;