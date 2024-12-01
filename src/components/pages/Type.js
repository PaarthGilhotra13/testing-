import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../Firebase"
import { Link } from "react-router-dom"
import moment from "moment"

export default function Type() {
  const [type, setType] = useState([])
  const [load, setLoad] = useState("")
  useEffect(
    () => {
      const qry = query(collection(db, "Type"))
      onSnapshot(qry, doc => {
        setType(doc.docs?.map(
          (el, index) => {
            return { id: el.id, data: el.data() }
          }
        ))
      })
    }
  )
  const getDate = (date) => {
    let date1 = date.toDate().toString()
    let newDate = moment(date1).format("Do MMM, YYYY")
    return newDate
  }
  return (
    <>
      <main id="main">
        {/* ======= Intro Single ======= */}
        <section className="intro-single">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="title-single-box">
                  <h1 className="title-single">Choose Your Property Style</h1>
                  {/* <span className="color-text-a">Grid News</span> */}
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <nav
                  aria-label="breadcrumb"
                  className="breadcrumb-box d-flex justify-content-lg-end"
                >
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to='/home'>Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Type
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Intro Single*/}
        {/* =======  Blog Grid ======= */}
        <section className="news-grid grid">
          <div className="container">
            <div className="row">
              {type?.map((el, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card-box-b card-shadow news-box">
                    <div className="img-box-b">
                      <img
                        src={el?.data?.image}
                        style={{height:"600px"}}
                        alt=""
                        className="img-b img-fluid"
                      />
                    </div>
                    <div className="card-overlay">
                      <div className="card-header-b">
                        <div className="card-category-b">
                          <Link to='/' className="category-b">
                            {/* {el?.data?.TypeName} */}
                            Click here to view
                          </Link>
                        </div>
                        <div className="card-title-b">
                          <h2 className="title-2">
                            <Link >
                              {el?.data?.TypeName}
                            </Link>
                          </h2>
                        </div>
                        <div className="card-date">
                          <span className="date-b">{getDate(el?.data?.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
              )
              }
              {/* End Blog Grid*/}
            </div>
          </div>
        </section>
      </main>

      {/* End #main */}
    </>

  )
}