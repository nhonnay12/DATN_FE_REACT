import React from "react";

{
  /* <a style={{ margin: '0 0 10px' , color: '#000', padding:'5px', borderRight: '1px solid #dcdcdc' }}>Signup</a>
<a style={{ margin: '0 0 10px', color: '#000' , padding:'5px', borderRight: '1px solid #dcdcdc'}}>Signin</a>
<a style={{ margin: '0 0 10px', color: '#000' , padding:'5px', borderRight: '1px solid #dcdcdc'}}>About</a>
<a style={{ margin: '0 0 10px', color: '#000' , padding:'5px', borderRight: '1px solid #dcdcdc'}}>Con</a> */
}

function Footer() {
  return (
    <footer
      style={{ color: "#000", padding: "20px", borderTop: "5px solid black" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            fontFamily: "Arial, Helvetica, sans-serif",
            cursor: "pointer",
          }}
        >
          <a href="/" style={{ color: "#000", textDecoration: "none" }}>
            {" "}
            TUN STOTE
          </a>
        </div>
        {/* <a style={{ margin: '0 0 10px', color: '#000' , padding:'5px', borderRight: '1px solid #dcdcdc' }}>Home</a> */}

        <div style={{ display: "flex", gap: "40px" }}>
          <div>
            <h4 style={{ margin: "0 0 10px" }}>Get started</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="/" style={{ color: "#000", textDecoration: "none" }}>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  Sign up
                </a>
              </li>
              {/* <li><a href="/" style={{ color: '#000', textDecoration: 'none' }}>Downloads</a></li> */}
            </ul>
          </div>
          <div>
            <h4 style={{ margin: "0 0 10px" }}>Category</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="/" style={{ color: "#000", textDecoration: "none" }}>
                  Truyện tranh{" "}
                </a>
              </li>
              <li>
                <a href="/" style={{ color: "#000", textDecoration: "none" }}>
                  Hoạt hình
                </a>
              </li>
              <li>
                <a href="/" style={{ color: "#000", textDecoration: "none" }}>
                  Hài hước
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: "0 0 10px" }}>About Page</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {/* <li><a href="/" style={{ color: '#000', textDecoration: 'none' }}></a></li> */}
              <li>
                <a href="/" style={{ color: "#000", textDecoration: "none" }}>
                  About page
                </a>
              </li>
              {/* <li><a href="/" style={{ color: '#000', textDecoration: 'none' }}>Reviews</a></li> */}
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "1.5rem" }}>🐦</span>
          <span style={{ fontSize: "1.5rem" }}>📘</span>
          <span style={{ fontSize: "1.5rem" }}>🔍</span>
          <button
            style={{
              backgroundColor: "#e91e63",
              color: "#000",
              padding: "5px 15px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            <a
              href="https://www.facebook.com/profile.php?id=100013607921672"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              {" "}
              Contact me
            </a>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
