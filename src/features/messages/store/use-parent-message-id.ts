import { useQueryState } from "nuqs";


export const useParentMessageId = () => {
    return useQueryState("parentMessageId");
}


//the useQueryState automatically changes the key(parentMessageId) to the updated value in the setstate function.
//const [parentMessageId, setParentMessageId] = useState(null); <=> https://localhost:3000?parentMessageId=null
//const [parentMessageId, setParentMessageId] = useState(1234); <=> https://localhost:3000?parentMessageId=1234
