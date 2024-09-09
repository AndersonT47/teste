export const exceptionValidationLabel = (defaultValueLabel: string, changedValueLabel: string) => {
  if (changedValueLabel === 'NOT APPLICABLE') {
    return { result: '' }
   }
    else if (defaultValueLabel !== changedValueLabel) {
    return { result: 'EXCEPTION' }
  }
  else { 
    return { result: '' }
  }
}