import { Children, cloneElement } from 'react';
import { useForm } from 'react-hook-form';
import './Form.css';

export default function Form({ children, schema = null, defaultValues, title = 'Form', submitTitle = 'Submit', className, onSubmit, successMessage }) {
  const { register, setError, handleSubmit, formState, reset } = useForm({ resolver: schema, reValidateMode: 'onSubmit', defaultValues });
  console.log(defaultValues);
  async function handler(data) {
    try {
      await onSubmit(data, setError);
      if (formState.isSubmitSuccessful) {
        reset(defaultValues, { keepIsSubmitted: true, keepValues: false });
        setTimeout(() => reset(defaultValues, { keepErrors: true, keepValues: true }), 2000);
      }
    } catch (err) {
      for (const key in err.response.data) {
        setError(key, { message: err.response.data[key].error });
      }
    }
  }

  return (
    <>
      <form className={`form ${className}`} onSubmit={handleSubmit(handler)} {...register('form')}>
        <h1 className='form__title'>{title}</h1>
        {Children.map(children, (child, i) => (
          <div className='form__input-row'>
            <p className='form__input-label'>{child.props.title}</p>
            {cloneElement(child, {
              key: i,
              className: `form__input form__${child.props.type}-input`,
              ref: register,
              ...child.props,
              ...register(child.props.name)
            })}
            {
              <div className='form__input-error'>
                {Children.count(children) === i + 1
                  ? formState.errors['form'] 
                    ? formState.errors['form'].message 
                    : formState.errors[child.props.name] && formState.errors[child.props.name].message
                  : formState.errors[child.props.name] && formState.errors[child.props.name].message
                }
              </div>
            }
          </div>
        ))}
        <input className='form__submit-button' type='submit' value={submitTitle} />
        <p className='form__on-submit-msg'>{formState.isSubmitSuccessful ? successMessage : ''}</p>
      </form>
    </>
  );
}
