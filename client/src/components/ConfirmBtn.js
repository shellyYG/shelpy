function ConfirmBtn(props) {
    return (
      <>
        {!props.disable && (
          <button className='btn-next' onClick={props.handleConfirm}>
            <span>{props.cta}</span>
          </button>
        )}
        {props.disable && (
          <button className='btn-disable' disabled>
            <span>{props.cta}</span>
          </button>
        )}
      </>
    );
}

export default ConfirmBtn;