import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UploadPhotoForm = ({authToken}) => {
    const navigate = useNavigate()
    const gameObj = useParams()
    const gameIdInt = parseInt(gameObj.gameId)
    const [base64ImageString, setBase64ImageString] = useState();

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setBase64ImageString(base64ImageString)
            // Update a component state variable to the value of base64ImageString
        });
    }

    const uploadImage = async () => {
        if (!base64ImageString) return;

        const requestBody = {
            game_id: gameIdInt,
            action_pic: base64ImageString
        };

        try {
            const response = await fetch('http://localhost:8000/gamepictures', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                console.log('Image uploaded successfully!');
                navigate(`/view/${gameIdInt}`)
            } else {
                console.error('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    return (
        <div>
            <input type="file" id="game_image" onChange={createGameImageString} />
            <input type="hidden" name="game_id" value={gameIdInt} />
            <button type="submit"
                    onClick={uploadImage}
                    className="button rounded-md bg-blue-700 text-blue-100 p-3 mt-4">
                    Submit Photo
            </button>
        </div>
    )
}