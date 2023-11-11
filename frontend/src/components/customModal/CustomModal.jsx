import React, { useRef } from "react";

const CustomModal = ({modalToggle, children } ) => {

    return(
        <>
            <div className={`modal_box ${modalToggle === true ? 'show_modal' : 'hide_modal'}`}>
                <div className="modal_container">
                    <div className="modal_box_wrapper">
                        { children }
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomModal