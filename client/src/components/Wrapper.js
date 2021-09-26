function Wrapper(props) {
    return <tr style={{backgroundColor: "blue"}}>
        {props.children}
    </tr>
}

export default Wrapper;