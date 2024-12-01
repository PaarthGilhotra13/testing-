export default function AddEnquiry() {
    return (
        <>
            <main id="main">
                {/* ======= Intro Single ======= */}
                <section className="intro-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-lg-8">
                                <div className="title-single-box">
                                    <h1 className="title-single">Add Enquiry</h1>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <nav
                                    aria-label="breadcrumb"
                                    className="breadcrumb-box d-flex justify-content-lg-end"
                                >
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="index.html">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Enquiry
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Intro Single*/}
                {/* ======= Contact Single ======= */}
                <section className="contact">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="contact-map box">
                                    <div id="map" className="contact-map">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.34203530906!2d78.2432323956461!3d17.41228101562799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1721934168534!5m2!1sen!2sin"
                                            width="100%"
                                            height={450}
                                            frameBorder={0}
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 section-t8 ">
                                <div className="row ">
                                    <div className="col-md-7">
                                        <form
                                            action="forms/contact.php"
                                            method="post"
                                            role="form"
                                            className="php-email-form"
                                        >
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="form-control form-control-lg form-control-a"
                                                            placeholder="Your Name"
                                                            required=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="form-group">
                                                        <input
                                                            name="email"
                                                            type="email"
                                                            className="form-control form-control-lg form-control-a"
                                                            placeholder="Your Email"
                                                            required=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-3">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            name="subject"
                                                            className="form-control form-control-lg form-control-a"
                                                            placeholder="Subject"
                                                            required=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <textarea
                                                            name="message"
                                                            className="form-control"
                                                            cols={45}
                                                            rows={8}
                                                            placeholder="Message"
                                                            required=""
                                                            defaultValue={""}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 my-3">
                                                    <div className="mb-3">
                                                        <div className="loading">Loading</div>
                                                        <div className="error-message" />
                                                        <div className="sent-message">
                                                            Your message has been sent. Thank you!
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 text-center">
                                                    <button type="submit" className="btn btn-a">
                                                        Send Message
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-5 section-md-t3">
                                        <div className="icon-box section-b2">
                                            <div className="icon-box-icon">
                                                <span className="bi bi-envelope" />
                                            </div>
                                            <div className="icon-box-content table-cell">
                                                <div className="icon-box-title">
                                                    <h4 className="icon-title">Say Hello</h4>
                                                </div>
                                                <div className="icon-box-content">
                                                    <p className="mb-1">
                                                        Email -
                                                        <span className="color-a">info@HomeSpaces.in</span>
                                                    </p>
                                                    <p className="mb-1">
                                                        Phone -
                                                        <span className="color-a">+91 96102-XXXXX</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="icon-box section-b2">
                                            <div className="icon-box-icon">
                                                <span className="bi bi-geo-alt" />
                                            </div>
                                            <div className="icon-box-content table-cell">
                                                <div className="icon-box-title">
                                                    <h4 className="icon-title">Find us in</h4>
                                                </div>
                                                <div className="icon-box-content">
                                                    <p className="mb-1">
                                                        Hyderabad
                                                        <br />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="icon-box">
                                            <div className="icon-box-icon">
                                                <span className="bi bi-share" />
                                            </div>
                                            <div className="icon-box-content table-cell">
                                                <div className="icon-box-title">
                                                    <h4 className="icon-title">Social networks</h4>
                                                </div>
                                                <div className="icon-box-content">
                                                    <div className="socials-footer">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item">
                                                                <a href="https://www.facebook.com" target="_blank" className="link-one">
                                                                    <i
                                                                        className="bi bi-facebook"
                                                                        aria-hidden="true"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href="https://x.com/?lang=en" target="_blank" className="link-one">
                                                                    <i className="bi bi-twitter" aria-hidden="true" />
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href="https://www.instagram.com" target="_blank" className="link-one">
                                                                    <i
                                                                        className="bi bi-instagram"
                                                                        aria-hidden="true"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href="https://www.linkedin.com" target="_blank" className="link-one">
                                                                    <i
                                                                        className="bi bi-linkedin"
                                                                        aria-hidden="true"
                                                                    />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Contact Single*/}
            </main>
            {/* End #main */}
        </>


    )
}