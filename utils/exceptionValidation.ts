export const exceptionValidation = (standardValue: string, clientValue: string, exceptionValue: string) => {
  if (exceptionValue === "NOT APPLICABLE") {
    return { result: ''}
  }
  else if (standardValue === exceptionValue && clientValue === exceptionValue) {
    return { result: ''};
  }  
  else if (standardValue === exceptionValue && clientValue !== exceptionValue) {
    return { result: 'CHANGED'}
  }
  else if (clientValue === exceptionValue && standardValue !== exceptionValue) {
    return { result: 'EXCEPTION'};
  }  
  else { 
    return { result: 'EXCEPTION'}
  }
}