import { Listbox } from "@headlessui/react";
import { useState } from "react";
import Layout from "components/common/Layout";
import MyTabs from "components/common/MyTabs";
import Option from "components/common/Option";
import { Stayer2 } from "components/stayer/Stayer2";

const test = () => {
  return (
    <Layout>
      <div className=" ">
        <Stayer2 />
        <MyTabs />
        <MyListbox />
      </div>
    </Layout>
  );
};

export default test;

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      <Listbox.Button>{selectedPerson.name}</Listbox.Button>
      <Listbox.Options>
        {people.map((person) => (
          <Listbox.Option
            key={person.id}
            value={person}
            disabled={person.unavailable}
          >
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
