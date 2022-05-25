function Select({ value, onChange, options, key, valueKey, textKey }) {
	return (
		<select 
			value={value} 
			onChange={onChange} 
			style={{ 
				borderRadius: "8px", 
				backgroundColor: "#344767", 
				color: "#ffffff", 
				border: "none", 
				fontWeight: "bold",
				textAlign: "center",
				fontSize: "0.6em"
			}}
		>
			{options && options.map((o) => (
				<option key={o[key]} value={o[valueKey]}>{o[textKey]}</option>
			))}
		</select>
	)
}

export default Select;
