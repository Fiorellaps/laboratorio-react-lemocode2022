import React from "react";
import { Link, generatePath } from "react-router-dom";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const CharactersList: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [organizationInput, setOrganizationInput] =
    React.useState<string>("Lemoncode");
  React.useEffect(() => {
    searchOrganization(organizationInput);
  }, []);

  const searchOrganization = (organization) => {
    console.log("Searching", organization);
    fetch(`https://api.github.com/orgs/${organization}/members`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.message ? setMembers([]) : setMembers(json);
      })
      .catch((e) => console.log("error", e));
  };
  const handleChange = (event) => {
    setOrganizationInput(event.target.value);
  };

  return members.length > 0 ? (
    <>
      <h2>Hello from List page</h2>
      <label htmlFor="Organization" className="mr-2">
        Organization
      </label>
      <input
        type="text"
        id="Organization"
        className="organization-button"
        name="Organization"
        defaultValue={organizationInput}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={(e) => searchOrganization(organizationInput)}
      >
        Enviar
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>
                <img src={member.avatar_url} style={{ width: "5rem" }} />
              </td>
              <td>
                <span>{member.id}</span>
              </td>
              <td>
                <Link to={generatePath("/detail/:id", { id: member.login })}>
                  {member.login}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <div>No members found</div>
  );
};
