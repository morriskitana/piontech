import React from 'react'
import Link from 'next/link'


const ClickHandler = () => {
    window.scrollTo(10, 0);
}


const BusinessFooter = (props) => {
    return (
        <footer className="site_footer footer_layout_3">
        <div className="footer_main_content bg-dark">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-6">
                <div className="heading_block mb-lg-0 text-white">
                  <h2 className="heading_text mb-1">
                    Tell Us About Your Project.
                  </h2>
                  <p className="heading_description mb-0 text-uppercase">
                    Let's collaborate and make great stuff.
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="social_wrap">
                  <h3 className="footer_info_title text-white mb-4 mb-md-0">Follow Us</h3>
                  <ul className="social_icons_block unordered_list">
                    <li>
                      <Link onClick={ClickHandler} href="/home_business_consulting">
                        <i className="fa-brands fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} href="/home_business_consulting">
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} href="/home_business_consulting">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} href="/home_business_consulting">
                        <i className="fa-brands fa-youtube"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row justify-content-lg-between pt-lg-4">
              <div className="col-lg-5">
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <div className="footer_widget">
                      <h3 className="footer_info_title">Start a Conversation</h3>
                      <ul className="icon_list unordered_list_block">
                        <li>
                          <a href="mailto:info@piontechsystems.com">
                            <span className="icon_list_text">
                              info@piontechsystems.com
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="footer_widget">
                      <h3 className="footer_info_title">Call Us:</h3>
                      <ul className="icon_list unordered_list_block">
                        <li>
                          <a href="tel:+254723029744">
                            <span className="icon_list_text">
                              +254 723 029 744 / +254 724 101 814
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer_widget">
                  <h3 className="footer_info_title">Useful Links</h3>
                  <ul className="icon_list unordered_list_block">
                    <li>
                      <Link onClick={ClickHandler} href="/service">
                        <span className="icon_list_text">
                          Careers
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} href="/team">
                        <span className="icon_list_text">
                          Our Team
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} href="/portfolio">
                        <span className="icon_list_text">
                          Latest Projects
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} href="/portfolio">
                        <span className="icon_list_text">
                          Awarded portfolio
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} href="/about">
                        <span className="icon_list_text">
                          FAQ
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer_widget">
                  <h3 className="footer_info_title">Address</h3>
                  <ul className="icon_list unordered_list_block">
                    <li>
                      <a href="https://maps.google.com/?q=A11%20Geokars%20Apartments%2C%20Getathuru%20Rd%2C%20Kitisuru%2C%20Nairobi" target="_blank" rel="noreferrer">
                        <span className="icon_list_text">
                          A11, Geokars Apartments, Getathuru Rd, Kitisuru, Nairobi.
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bottom bg-primary text-white">
          <div className="container d-md-flex align-items-md-center justify-content-md-between">
            <p className="copyright_text m-0">
              Copyright © 2024 Piontech, All rights reserved.
            </p>
            <p className="copyright_text m-0">
              Developed by <Link onClick={ClickHandler} href="/" target="_blank">XpressBuddy</Link>
            </p>
          </div>
        </div>
      </footer>
    )
}

export default BusinessFooter;

