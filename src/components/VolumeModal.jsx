export default function VolumeModal() {
  return (
    <div className="modal fade" id="volume" tabIndex="-1" aria-labelledby="volumeModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="volumeModalLabel">
              <i className="fa fa-volume-up vi-nopart" aria-hidden="true"></i> Ovozli o'qish
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Saytda ovozli oʼqish imkoniyati mavjud, Matnni ovozli eshitish uchun matinni belgilang va paydo bolgan tugmani ustiga bosing
          </div>
        </div>
      </div>
    </div>
  )
}
