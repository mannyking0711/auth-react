import { useContext, useEffect, useState } from 'react'
import { AppContext, AppContextType } from '../../contexts/AppContextProvider'
import { MTextInput } from '../../components/Input/MTextInput'
import { MButton } from '../../components/Button/MButton'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import axiosInstance from 'axiosApi'

export const RequestView = () => {
  const { setCurrentPage } = useContext(AppContext) as AppContextType
  const [lastQuery, setLastQuery] = useState('')
  const [track, setTrack] = useState('')

  useEffect(() => {
    setCurrentPage('request_scan')
  }, [])

  const validationFormSchema = yup.object({
    domain: yup
      .string()
      .required('Please input domain')
      .matches(
        /^(?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/,
        'Please input valid domain'
      )
  })
  const formik = useFormik({
    initialValues: {
      domain: ''
    },
    validationSchema: validationFormSchema,
    onSubmit: async (values) => {
      setLastQuery(values.domain)
      axiosInstance.post('/scan_request', {
        domain: values.domain
      }).then((res) => {
        console.log(res.data.track);
        setTrack(res.data.track);
      })
    }
  })
  return (
    <div className="flex h-full items-center justify-center text-center">
      <div className="flex flex-col gap-5">
        <p className="text-4xl font-bold">
          Automated Red Team Platform for your organization
        </p>
        <p>
          All you need to provide the domain name for your organization (eg.
          example.com)
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="flex justify-center gap-2"
        >
          <p className="pt-1">Domain name: &nbsp;</p>
          <div className="mr-2 inline-block">
            <MTextInput
              name="domain"
              disabled={lastQuery.length !== 0}
              value={formik.values.domain}
              onChange={formik.handleChange}
              placeholder="example.com"
            />
            <p className="mt-1 text-sm text-[#ff0000]">
              {formik.touched.domain && formik.errors.domain}
            </p>
          </div>
          <MButton type="submit">Start Scan</MButton>
        </form>

        {lastQuery ? (
          <p className="italic">
            {lastQuery} scanning. Take a break, this will take minutes. &nbsp;
            <Link to={'/track/' + track} className="text-blue-600">
              Click here to track&nbsp;
              <i className="material-icons-outlined text-[14px]">
                arrow_forward
              </i>
            </Link>
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
