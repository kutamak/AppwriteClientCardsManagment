import './niceLoading.css'

type NiceLoadingProps = {
  height?: number | string,
}

export const NiceLoading = (props: NiceLoadingProps) => {
  const { height="100%" } = props;
  return (
    <div className="resetNodesCss" style={{height: height}}>
      <div className="center">
        <div className="wave" style={{height: height}}></div>
        <div className="wave" style={{height: height}}></div>
        <div className="wave" style={{height: height}}></div>
        <div className="wave" style={{height: height}}></div>
        <div className="wave" style={{height: height}}></div>
        <div className="wave" style={{height: height}}></div>
        <div className="wave" style={{height: height}}></div>
        <div className="wave" style={{height: height}}></div>
        <div className="wave" style={{height: height}}></div>
        <div className="wave" style={{height: height}}></div>
      </div>
    </div>
  )
}

export default NiceLoading
