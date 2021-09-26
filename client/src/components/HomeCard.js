function HomeCard(props) {
    const homeCardStyle = {
        textAlign: props.position,
        backgroundColor: "black",
        color: "white",
        borderRadius: "10px",
        padding: "30px",
        margin: "30px",
    }
    return <th style={homeCardStyle}>{props.text}</th>;
}

export default HomeCard;