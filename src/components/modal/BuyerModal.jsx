import React from "react";

export default function BuyerModal({ submission }) {
  return (
    <dialog
      id="my_modal_5"
      className="modal text-start modal-bottom sm:modal-middle text-black">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          <b className="text-warning">submission_Details:</b>  {submission.submission_Details}
        </h3>

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
