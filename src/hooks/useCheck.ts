import { useCallback, useMemo, useState } from "react"

export type ValidType = {
    [key: string]: {
        isValid: boolean
    }
}

export const useCheck = <T>(state: T) => {

    const [error, setError] = useState<string>("")
    const [obj, setObj] = useState(state)
    const [validation, setValidation] = useState<ValidType>({
        blur: {
            isValid: false,
        }
    })
        
    const handler = useCallback((title: string, value: string) => {
        setObj({ ...obj, [title]: value })
        setValidation({ ...validation, [title]: { isValid: !!value },})
    }, [validation, obj])

    const blur = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>, error = "") => {
        const target = e.target

        if (!target.value) {
            target.style.borderColor = "#B3261E"
            setValidation({ ...validation, blur: { isValid: !!target.value }})
            setError(error)
        } else {
            target.style.borderColor = "#AEAAAE"
            setValidation({ ...validation, blur: { isValid: !!target.value }})
            setError("")
        }
    }

    const validator = (obj: ValidType): boolean => {
        return Object.values(obj).every(value => value.isValid === true)
    }

    const status = useMemo(() => validator(validation), [validation])

    return {
        obj,
        status,
        error,
        handler,
        blur,
    }
}
