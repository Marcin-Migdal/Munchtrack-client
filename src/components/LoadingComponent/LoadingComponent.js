import { CircularProgress } from '@material-ui/core'
import React from 'react'

export default function LoadingComponent({ condition = true }) {
  return condition && <CircularProgress color="primary" />
}
