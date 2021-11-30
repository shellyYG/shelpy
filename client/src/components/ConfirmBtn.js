function ConfirmBtn(props) {
    return (
      <button
        data-text="Book Room"
        className="btn-next"
        onClick={props.handleConfirm}
      >
        <span>{props.cta}</span>
      </button>
    );
}

export default ConfirmBtn;