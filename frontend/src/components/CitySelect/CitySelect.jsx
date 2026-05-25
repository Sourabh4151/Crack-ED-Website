import React from 'react'
import './CitySelect.css'

const CITY_LABEL = 'City'
const CITY_DISABLED_HINT = 'Select State First'

const SelectArrow = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CitySelect = ({
  value,
  onChange,
  onBlur,
  state,
  cities = [],
  selectClassName = '',
  fieldClassName = '',
  controlClassName = '',
  arrowClassName = '',
  error,
  errorClassName = '',
  required = false,
}) => {
  const needsState = !state

  return (
    <div className={fieldClassName}>
      <div
        className={[
          'city-select-control',
          'city-select-wrap',
          needsState ? 'city-select-wrap--needs-state' : '',
          controlClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <select
          name="city"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={selectClassName}
          disabled={needsState}
          required={required && !needsState}
          title={needsState ? CITY_DISABLED_HINT : undefined}
          aria-label={needsState ? `${CITY_LABEL}, ${CITY_DISABLED_HINT}` : CITY_LABEL}
        >
          <option value="">{CITY_LABEL}</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {needsState && (
          <span className="city-select-hover-hint">{CITY_DISABLED_HINT}</span>
        )}
        <SelectArrow className={arrowClassName} />
      </div>
      {error ? <span className={errorClassName}>{error}</span> : null}
    </div>
  )
}

export default CitySelect
