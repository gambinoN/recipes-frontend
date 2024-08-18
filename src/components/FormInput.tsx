interface FormInputProps {
    label: string,
    type: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string
}

const FormInput: React.FC<FormInputProps> = ({label, type, value, onChange, placeholder}) => {
   return(
    <div className="flex flex-col">
        <label className="mb-3">{label}</label>
        <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        className='px-5 py-4 font-roboto' 
        />
    </div>
  )
}

export default FormInput