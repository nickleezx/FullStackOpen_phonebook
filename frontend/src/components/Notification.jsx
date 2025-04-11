const Notification = ({ statusMessage }) => {
    const notificationStyle = {
        backgroundColor: "grey",
        border: "2px solid green",
        color: "green",
    }

    const errorStyle = {
        backgroundColor: "grey",
        color: "red",
        border: "2px solid red",
    }

    if (statusMessage === null)
        return null

    if (statusMessage.includes("already been removed from the server"))
        return (
            <h2 style={errorStyle}>
                {statusMessage}
            </h2>
        )
    return (
        <h2 style={notificationStyle}>
            {statusMessage}
        </h2>
    )
}

export default Notification