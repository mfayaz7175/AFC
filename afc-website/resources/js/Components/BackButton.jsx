import PrimaryButton from "./PrimaryButton";

export default function BackButton(){
  return(
    <button className="btn text-white mb-4" onClick={()=> window.history.back()}>
      Back
    </button>
  )
}
