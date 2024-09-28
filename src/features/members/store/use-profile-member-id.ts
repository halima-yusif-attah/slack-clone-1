import { useQueryState } from "nuqs";


export const useProfileMemberId = () => {
    return useQueryState("profileMemberId");
}


//the useQueryState automatically changes the key(parentMessageId) to the updated value in the setstate function.
//const [profileMemberId, setParentMessageId] = useState(null); <=> https://localhost:3000?parentMessageId=null
//const [profileMemberId , setParentMessageId] = useState(1234); <=> https://localhost:3000?parentMessageId=1234
