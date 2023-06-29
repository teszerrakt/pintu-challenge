import { renderHook, act } from '@testing-library/react-hooks'
import { render, screen, fireEvent } from '@testing-library/react'
import useComponentVisible from './useComponentVisible'
import React from 'react'

describe('useComponentVisible', () => {
  it('should toggle the component visibility correctly', () => {
    const { result } = renderHook(() =>
      useComponentVisible<HTMLDivElement>(false)
    )
    expect(result.current.isComponentVisible).toBe(false)

    act(() => {
      result.current.setIsComponentVisible(true)
    })

    expect(result.current.isComponentVisible).toBe(true)
  })
})
