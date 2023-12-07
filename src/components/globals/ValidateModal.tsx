import MyModal from "./MyModal"

export const ValidateModal = () => {
    return (
        <MyModal 
            title={"Are you sure?"} 
            doClose={()=>{console.log("Close clicked")}}
        >
            Here should be something ?
        </MyModal>
    )
}