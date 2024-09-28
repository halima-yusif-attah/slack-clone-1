'use client'

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { 
   id: Id<"members">, 
   role: "admin" | "member";
};
type ResponseType = Id<"members"> | null;


type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void; //for finished request whether a success of failure
    throwError?: boolean;
}

export const useUpdateMember = () => {
    const [data, setData ] = useState<ResponseType>(null);
    const [error, setError ] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null)
    
    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);
    


    const mutation = useMutation(api.members.update);

    const mutate =  useCallback(async (values: RequestType, options?: Options) => {
        try {
            setData(null);
            setError(null);
           setStatus("pending");


           const response = await mutation(values);
           options?.onSuccess?.(response); 
           return response;

        } catch (error) {
            setStatus("error")
            options?.onError?.(error as Error);
            
            if (options?.throwError) {
                throw error;  
            }

        } finally {
            setStatus("settled");
            options?.onSettled?.();  //finished request whether a success of failure
        }
    }, [mutation])
    return {
        mutate,
        data,
        error,
        isPending,
        isSuccess,
        isError,
        isSettled,
    }
}