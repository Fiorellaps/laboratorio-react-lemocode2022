import React from "react";
import { Link, generatePath } from "react-router-dom";
import { MyContext } from "./OrganizationContext";
import { ListPagination } from "./pagination";
export interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  /*const [organizationInput, setOrganizationInput] =
    React.useState<string>("Lemoncode");*/
  const myContext = React.useContext(MyContext);

  React.useEffect(() => {
    searchOrganization(myContext.organization);
  }, []);

  const searchOrganization = (organization) => {
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
    myContext.setOrganization(event.target.value);
  };

  return (
    <>
      {console.log("myContext", myContext)}
      <h2>Hello from List page</h2>
      <label htmlFor="Organization" className="mr-2">
        Organization
      </label>
      <input
        type="text"
        id="Organization"
        className="organization-button"
        name="Organization"
        defaultValue={myContext.organization}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={(e) => searchOrganization(myContext.organization)}
      >
        Enviar
      </button>
      {members.length > 0 ? (
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
      ) : (
        <div>No members found</div>
      )}
    </>
  );
};
