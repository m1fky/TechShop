import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { PatternFormat } from 'react-number-format';
import { apiRequest } from '../api';

const DADATA_API_KEY = '5491f80a0cb27fa3b946a7e8f06d7e61093031f3';
const DADATA_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

function getFullAddress(data) {
  const parts = [];

  // Область/Край/Республика
  if (data.region_with_type && !data.region_with_type.includes('Москва') && !data.region_with_type.includes('Санкт-Петербург')) {
    parts.push(data.region_with_type);
  }

  // Город/Село/Деревня и т.д.
  if (data.city_with_type) {
    parts.push(data.city_with_type);
  } else if (data.settlement_with_type) {
    parts.push(data.settlement_with_type);
  }

  // Улица
  if (data.street_with_type) {
    parts.push(data.street_with_type);
  }

  // Дом
  if (data.house_type && data.house) {
    parts.push(`${data.house_type} ${data.house}`);
  }

  return parts;
}

function FormField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  style = {},
  pattern,
  title,
  required = false,
  format,
  mask,
  autoComplete,
  isPhone,
  suggestions,
  onSuggestionSelect
}) {
  const inputStyles = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: `1px solid ${error ? '#ff4d4f' : '#ddd'}`,
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    color: '#000',
    backgroundColor: '#fff',
    ...style
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 1) return `+7 ${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    onChange({
      target: {
        name,
        value: formattedValue
      }
    });
  };

  if (isPhone) {
    return (
      <div style={{ marginBottom: '15px', width: '100%' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
          {label}
          <input
            type="tel"
            name={name}
            value={value}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            required={required}
            style={inputStyles}
            autoComplete={autoComplete}
          />
        </label>
        {error && <div style={{ fontSize: '12px', color: '#ff4d4f', marginTop: '4px' }}>{error}</div>}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '15px', width: '100%', position: 'relative' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
        {label}
        {format ? (
          <PatternFormat
            format={format}
            mask={mask}
            value={value}
            onValueChange={(values) => {
              onChange({
                target: {
                  name: name,
                  value: values.formattedValue
                }
              });
            }}
            placeholder={placeholder}
            required={required}
            valueIsNumericString={true}
            customInput={(props) => (
              <input {...props} style={inputStyles} name={name} autoComplete={autoComplete} />
            )}
          />
        ) : (
          <>
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              pattern={pattern}
              title={title}
              required={required}
              style={inputStyles}
              autoComplete={autoComplete}
            />
            {suggestions && suggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                zIndex: 1000,
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => onSuggestionSelect(suggestion)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    {suggestion.value}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </label>
      {error && <div style={{ fontSize: '12px', color: '#ff4d4f', marginTop: '4px' }}>{error}</div>}
    </div>
  );
}

function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function validateName(value) {
  if (!value.trim()) return 'ФИО обязательно';
  if (value.length < 2) return 'ФИО должно быть не короче 2 символов';
  if (value.length > 100) return 'ФИО должно быть не длиннее 100 символов';
  if (!/^[а-яА-ЯёЁ\s-]+$/.test(value)) return 'ФИО может содержать только русские буквы, пробелы и дефис';

  const words = value.trim().split(' ').filter(word => word.length > 0);

  if (words.length !== 3) {
    return 'Введите полное ФИО (Фамилия, Имя и Отчество)';
  }

  const [lastName, firstName, patronymic] = words;

  if (lastName.length < 2) {
    return 'Фамилия должна быть не короче 2 символов';
  }

  if (firstName.length < 2) {
    return 'Имя должно быть не короче 2 символов';
  }

  if (patronymic.length < 3) {
    return 'Отчество должно быть не короче 3 символов';
  }

  return '';
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearFromCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    region: '',
    city: '',
    street: '',
    house: '',
    apartment: '',
    postalCode: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [addressField, setAddressField] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(null);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const fetchDadataSuggestions = async (query, field) => {
    try {
      const locations = {
        region: { from: 'region', to: 'region' },
        city: { from: 'city', to: 'settlement' },
        street: { from: 'street', to: 'street' },
        house: { from: 'house', to: 'house' }
      };

      let body = {
        query,
        count: 10,
        restrictions: {
          division: 'administrative'
        }
      };

      if (locations[field]) {
        body.from_bound = { value: locations[field].from };
        body.to_bound = { value: locations[field].to };
      }

      if (selectedRegion && (field === 'city' || field === 'street' || field === 'house')) {
        body.locations = [{
          region: selectedRegion
        }];
        body.restrict_value = true;
      }

      if (field === 'street' && formData.city) {
        body.restrictions.city = formData.city;
      }
      if (field === 'house' && formData.street) {
        body.restrictions.street = formData.street;
      }

      const response = await fetch(DADATA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${DADATA_API_KEY}`
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      setSuggestions(data.suggestions);
      setAddressField(field);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    const { data } = suggestion;
    
    setFormData(prev => {
      const updates = {};
      
      switch (addressField) {
        case 'region':
          updates.region = data.region_with_type || '';
          // Сохраняем выбранный регион для последующих ограничений
          setSelectedRegion(data.region);
          // Очищаем зависимые поля
          updates.city = '';
          updates.street = '';
          updates.house = '';
          break;
        case 'city':
          updates.city = data.city_with_type || data.settlement_with_type || '';
          // Очищаем зависимые поля
          updates.street = '';
          updates.house = '';
          break;
        case 'street':
          updates.street = data.street_with_type || '';
          // Очищаем зависимое поле дома
          updates.house = '';
          break;
        case 'house':
          if (data.house_type && data.block_type && data.block) {
            updates.house = `${data.house_type} ${data.house}, ${data.block_type} ${data.block}`;
          } else if (data.house_type) {
            updates.house = `${data.house_type} ${data.house}`;
          } else {
            updates.house = data.house || '';
          }
          break;
      }
      
      if (data.postal_code) {
        updates.postalCode = data.postal_code;
      }
      
      return { ...prev, ...updates };
    });

    setSuggestions([]);
  };

  useEffect(() => {
    return () => {
      setSuggestions([]);
    };
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return validateName(value);
      case 'email':
        if (!value.trim()) return 'Email обязателен';
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) return 'Введите корректный email';
        break;
      case 'region':
        if (!value.trim()) return 'Поле область обязательно';
        if (!/^[а-яА-ЯёЁ\s-]+$/.test(value)) return 'Название области может содержать только русские буквы';
        break;
      case 'city':
        if (!value.trim()) return 'Поле населенный пункт обязательно';
        if (!/^[а-яА-ЯёЁ\s-]+$/.test(value)) {
          return 'Название населенного пункта может содержать только русские буквы';
        }
        break;
      case 'street':
      case 'house':
        if (!value.trim()) return `Поле ${name === 'street' ? 'улица' : 'дом'} обязательно`;
        break;
      case 'postalCode':
        const cleanPostalCode = value.replace(/\D/g, '');
        if (!cleanPostalCode) return 'Поле индекс обязательно';
        if (cleanPostalCode.length !== 6) return 'Введите корректный индекс (6 цифр)';
        break;
      case 'phone':
        const digits = value.replace(/\D/g, '');
        if (!digits) return 'Введите номер телефона';
        if (digits.length !== 11) return 'Введите номер телефона полностью';
        if (!digits.startsWith('7')) return 'Номер должен начинаться с 7';
        if (!/^7\d{10}$/.test(digits)) return 'Введите корректный номер телефона';
        break;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'name') {
      newValue = capitalizeWords(value);
    } else if (['region', 'city'].includes(name)) {
      newValue = capitalizeWords(value);
      if (value.length > 2) {
        fetchDadataSuggestions(value, name);
      }
    } else if (name === 'street' && value.length > 2) {
      fetchDadataSuggestions(`${formData.city}, ${value}`, 'street');
    } else if (name === 'house' && value.length > 0) {
      fetchDadataSuggestions(`${formData.city}, ${formData.street}, ${value}`, 'house');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    const error = validateField(name, newValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const isFormValid = () => {
    const requiredFields = ['name', 'email', 'region', 'city', 'street', 'house', 'postalCode', 'phone'];
    const hasAllRequiredFields = requiredFields.every(field => formData[field].trim() !== '');
    const hasNoErrors = Object.keys(errors).every(key => !errors[key]);
    return hasAllRequiredFields && hasNoErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Проверяем ошибки в форме
  const newErrors = Object.keys(formData).reduce((acc, field) => {
    const error = validateField(field, formData[field]);
    if (error) acc[field] = error;
    return acc;
  }, {});

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  if (cartItems.length === 0) {
    alert('Корзина пуста! Пожалуйста, добавьте товары перед оформлением заказа.');
    return;
  }

  setIsSubmitting(true);

  try {
    // Шаг 1: Резервируем товары (уменьшаем количество на складе)
    await Promise.all(
      cartItems.map((item) =>
        apiRequest(`/products/${item.id}/decrement`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: item.quantity }),
        })
      )
    );

    // Шаг 2: Отправляем детали заказа на сервер
    const orderDetails = {
      items: cartItems,
      customer: formData,
      total,
    };

    const response = await apiRequest('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });

    if (response.success) {
      setIsSuccess(true);
      cartItems.forEach((item) => clearFromCart(item.id));
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } else {
      throw new Error(response.message || 'Ошибка при оформлении заказа');
    }
  } catch (error) {
    alert(error.message || 'Произошла ошибка при оформлении заказа');
  } finally {
    setIsSubmitting(false);
  }
};


  if (isSuccess) {
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: 'green', marginBottom: '15px' }}>Заказ успешно оформлен!</h2>
        <p>Спасибо за покупку! Вы будете перенаправлены на главную страницу через несколько секунд...</p>
      </div>
    );
  }

  const formIsValid = isFormValid();

  // Define form fields array with updated structure
  const formFields = [
    { label: 'ФИО', name: 'name', placeholder: 'Иванов Иван Иванович', required: true, autoComplete: 'name' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'example@mail.com', required: true, autoComplete: 'email' },
    { label: 'Область/Край/Республика', name: 'region', placeholder: 'Московская область', required: true, autoComplete: 'address-level1' },
    { label: 'Населенный пункт', name: 'city', placeholder: 'Москва / Село Иваново', required: true, autoComplete: 'address-level2' },
    { label: 'Улица', name: 'street', placeholder: 'ул. Ленина', required: true, autoComplete: 'street-address' },
    { label: 'Дом', name: 'house', placeholder: 'д. 12, стр. 1', required: true, autoComplete: 'address-line2' },
    { label: 'Квартира', name: 'apartment', placeholder: '123', autoComplete: 'address-line3' },
    {
      label: 'Индекс',
      name: 'postalCode',
      placeholder: '123456',
      required: true,
      format: '######',
      mask: '_',
      autoComplete: 'postal-code'
    },
    {
      label: 'Телефон',
      name: 'phone',
      placeholder: '+7 (999) 999-99-99',
      required: true,
      isPhone: true,
      autoComplete: 'tel'
    }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Оформление заказа</h1>

      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Ваш заказ:</h2>

      {cartItems.map((item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>{item.name} x {item.quantity}</span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: '2px solid #eee',
        marginTop: '10px',
        paddingTop: '10px',
      }}>
        <div style={{
          fontSize: '20px',
          fontWeight: 'bold',
          padding: '10px',
          backgroundColor: '#f8f8f8',
          borderRadius: '4px'
        }}>
          Итого: ${total.toFixed(2)}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        {formFields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
            suggestions={field.name === addressField ? suggestions : []}
            onSuggestionSelect={handleSuggestionSelect}
          />
        ))}

        <button
          type="submit"
          disabled={isSubmitting || !formIsValid || cartItems.length === 0}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isSubmitting || !formIsValid || cartItems.length === 0
              ? '#cccccc'
              : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting || !formIsValid || cartItems.length === 0
              ? 'not-allowed'
              : 'pointer',
            marginTop: '20px'
          }}
        >
          {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;