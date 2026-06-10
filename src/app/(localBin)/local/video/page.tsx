export default function Video() {
  return (
    <div>
      <video
        muted
        autoPlay
        loop
      >
        <source src="/tp_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}