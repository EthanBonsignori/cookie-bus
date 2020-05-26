import React from 'react';
import { Divider, Input, Button, Toggle } from '../elements';

const EditProfileForm = ({ editProfile, onSubmit, onBack }) => {
  const [profile, setProfile] = React.useState({
    name: '',
    url: '',
    cookies: [],
    allCookies: false,
    default: false
  });

  const [cookie, setCookie] = React.useState('');

  React.useLayoutEffect(() => {
    setProfile(editProfile);
  }, [editProfile]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const newProfile = {
      ...profile,
      name: profile.name.trim(),
      url: profile.url.trim()
    };
    onSubmit(newProfile);
  };

  const addCookie = () => {
    if (cookie) {
      setProfile({
        ...profile,
        cookies: [...profile.cookies, cookie]
      });
      setCookie('');
    }
  };

  const deleteCookie = (value) => {
    setProfile({
      ...profile,
      cookies: profile.cookies.filter((cookie) => cookie !== value)
    });
  };

  const toggoleAllCookies = () => {
    setProfile({
      ...profile,
      allCookies: !profile.allCookies
    });
  };

  const toogleDefault = () => {
    setProfile({
      ...profile,
      default: !profile.default
    });
  };

  return (
    <form className="" onSubmit={handleUpdateProfile}>
      <div className="block text-md font-medium text-center uppercase">
        Edit Profile
      </div>
      <div className="mt-1 mt-4">
        <Input name="name" type="text" placeholder={profile.name} disabled />
      </div>

      <div className="mt-1 mt-4">
        <Input name="url" type="text" placeholder={profile.url} disabled />
      </div>

      <div className="flex justify-between mt-4">
        <div className="text-sm">
          <label htmlFor="comments" className="font-medium">
            Import all cookies
          </label>
        </div>
        <div>
          <Toggle on={profile.allCookies} onClick={toggoleAllCookies} />
        </div>
      </div>
      <div className="text-primary-lighter text-xs">
        Uncheck to import specific cookies
      </div>
      <div className="flex justify-between mt-4">
        <div className="text-sm">
          <label htmlFor="comments" className="font-medium">
            Set as default profile
          </label>
        </div>
        <div>
          <Toggle on={profile.default} onClick={toogleDefault} />
        </div>
      </div>

      <Divider color="border-green-500" />

      {!profile.allCookies && (
        <>
          <div className="block mt-2 text-left text-sm font-medium">
            Cookies
          </div>
          <div className="mt-4 w-full inline-flex justify-between">
            <Input
              name="cookie"
              type="text"
              value={cookie}
              onChange={(e) => setCookie(e.target.value)}
              placeholder="Cookie name"
            />
            <button
              type="button"
              onClick={addCookie}
              className="text-2xl ml-4 px-4 hover:bg-secondary hover:text-white"
            >
              +
            </button>
          </div>

          <div className="w-full mt-4">
            {profile.cookies.map((cookie) => (
              <div
                className="inline-flex items-center w-full text-secondary mb-1"
                key={cookie}
              >
                <div className="px-3 py-2 flex-1 text-left">{cookie}</div>
                <button
                  type="button"
                  onClick={() => deleteCookie(cookie)}
                  className="text-2xl ml-4 px-4 text-red-600 focus:outline-none hover:bg-red-600 hover:text-white"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-5 mt-5">
        <Button type="submit" secondary>
          Save
        </Button>

        <Button type="button" onClick={onBack}>
          Back
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
