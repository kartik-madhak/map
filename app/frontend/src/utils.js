import swal from '@sweetalert/with-react'

export const showModal = (title, message, type) => {
    swal({
        title: title,
        text: message,
        icon: type,
        button: "OK",
    });
}

export const getAuthUser = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/users/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
    });
    const data = await response.json();
    return data;
}