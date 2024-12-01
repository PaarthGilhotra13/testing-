// import { Carousel, CarouselCaption } from "react-bootstrap";

export default function Home2() {
    return (
        <>
            <div
                id="carouselExampleAutoplaying"
                className="carousel slide mt-5"
                data-bs-ride="carousel"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/assets/img/slide-1.jpg" className="d-block w-100 img-fluid" alt="..." />
                        <div className="carousel-caption d-none d-md-block">

                            <div className="row">
                                <div className="col-lg-8 col-md-11">
                                    <h1 style={{ color: "white" }}>First slide label</h1>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            {/* <div className="overlay overlay-a" />
                            <div className="intro-content display-table">
                                <div className="table-cell">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <div className="intro-body">
                                                    <p className="intro-title-top">
                                                        Doral, Florida
                                                        <br /> 78345
                                                    </p>
                                                    <h1 className="intro-title mb-4 ">
                                                        <span className="color-b">204 </span> Mount
                                                        <br /> Olive Road Two
                                                    </h1>
                                                    <p className="intro-subtitle intro-price">
                                                        <a href="#">
                                                            <span className="price-a">rent | $ 12.000</span>
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                    </div>
                    <div className="carousel-item">
                        <img src="/assets/img/slide-2.jpg" className="d-block w-100 img-fluid" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>

                    </div>
                    <div className="carousel-item">
                        <img src="/assets/img/post-single-1.jpg" className="d-block w-100 img-fluid" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>

                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* <div
  id="carouselExampleInterval"
  className="carousel slide"
  data-bs-ride="carousel"
>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval={10000}>
      <img src="/assets/img/slide-1.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item" data-bs-interval={2000}>
      <img src="/assets/img/slide-2.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src="/assets/img/slide-3.jpg" className="d-block w-100" alt="..." />
    </div>
  </div>
  <button
    className="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleInterval"
    data-bs-slide="prev"
  >
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button
    className="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleInterval"
    data-bs-slide="next"
  >
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div> */}


            {/* <Carousel>
            <Carousel.Item>
                <div>

                <img
                    className="img-fluid"
                    src="/assets/img/slide-1.jpg"
                    alt="First slide"
                />
                </div>
                <div>
                <Carousel.Caption>
                    <h3>First Slide Label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div>
                <img
                    className="img-fluid"
                    src="/assets/img/slide-2.jpg"
                    alt="Second slide"
                />
                </div>
                <div>
                <Carousel.Caption>
                    <h3>Second Slide Label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </div>

            </Carousel.Item>
            <Carousel.Item>
                <div>
                <img
                    className="img-fluid"
                    src="/assets/img/slide-4.jpg"
                    alt="Third slide"
                />
                </div>
                <div>
                
                <Carousel.Caption>
                    <h3>Fourth Slide Label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel> */}
        </>
    )
}