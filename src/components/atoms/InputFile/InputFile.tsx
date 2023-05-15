import "./style.css"

interface InputFileType {
    classPrefix?: string;
    title?: string;
    children?: any;
}

export const InputFile = ({ classPrefix, title, children }: InputFileType) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
    }

    return (
        <div className={`${classPrefix} InputFile`}>
            <label>
                {title}
                {children}
                <input 
                    type="file" 
                    onChange={handleChange}
                    accept="image/*,.png,.jpg,.gif,.web,"
                />
            </label>
        </div>
    )
}
