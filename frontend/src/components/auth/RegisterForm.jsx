const RegisterForm = () => {
    return (
      <form>
        <input type="text" placeholder="Имя" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Пароль" />
        <input type="password" placeholder="Подтвердите пароль" />
        <button type="submit">Зарегистрироваться</button>
      </form>
    );
  };