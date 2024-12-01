export default function UserBooking() {
    return (
        <>
            <section className="intro-single">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="title-single-box">
                                <h1 className="title-single">Manage Property</h1>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-4">
                            <nav
                                aria-label="breadcrumb"
                                className="breadcrumb-box d-flex justify-content-lg-end"
                            >
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/admin">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Manage Property
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <td>S.No</td>
                            <td>Type Name</td>
                            <td>City Name</td>
                            <td>Prop Name</td>
                            <td>Address</td>
                            <td>Image</td>
                            <td>Cost</td>
                            <td>Seller Details</td>
                            <td>Description</td>
                            <td>Status</td>
                            <td>Created At</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {prop?.map(
                            (el, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el?.data?.TypeName}</td>
                                    <td>{el?.data?.CityName}</td>
                                    <td>{el?.data?.PropertyName}</td>
                                    <td>{el?.data?.Address}</td>
                                    <td><img style={{ height: "100px", width: "100px" }} src={el?.data?.image} /></td>
                                    <td>{el?.data?.Cost}</td>
                                    <td>{el?.data?.SellerDetails}</td>
                                    <td>{el?.data?.Description}</td>
                                    <td>{el?.data?.status == true ? "Enable" : "Disable"}</td>
                                    <td>{getDate(el?.data?.createdAt)}</td>
                                    <td>
                                        <Link to={'/admin/editprop/' + el.id} className="btn btn-success">
                                            <i className="bi bi-pen" />
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger">
                                            <i className="bi bi-trash" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>

                </table>
            </div>
        </>
    )
}