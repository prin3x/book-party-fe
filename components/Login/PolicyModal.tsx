import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/outline";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  onDecline: () => void;
};

export default function PolicyModal({
  isOpen,
  setIsOpen,
  onConfirm,
  onDecline,
}: Props) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-scroll h-screen"
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <InformationCircleIcon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Policy and Agreement
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 overflow-y-scroll h-96">
                        The standard Lorem Ipsum passage, used since the 1500s
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum. Section 1.10.32 of de Finibus
                        Bonorum et Malorum, written by Cicero in 45 BC Sed ut
                        perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi
                        architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit
                        aut fugit, sed quia consequuntur magni dolores eos qui
                        ratione voluptatem sequi nesciunt. Neque porro quisquam
                        est, qui dolorem ipsum quia dolor sit amet, consectetur,
                        adipisci velit, sed quia non numquam eius modi tempora
                        incidunt ut labore et dolore magnam aliquam quaerat
                        voluptatem. Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi
                        ut aliquid ex ea commodi consequatur? Quis autem vel eum
                        iure reprehenderit qui in ea voluptate velit esse quam
                        nihil molestiae consequatur, vel illum qui dolorem eum
                        fugiat quo voluptas nulla pariatur? 1914 translation by
                        H. Rackham But I must explain to you how all this
                        mistaken idea of denouncing pleasure and praising pain
                        was born and I will give you a complete account of the
                        system, and expound the actual teachings of the great
                        explorer of the truth, the master-builder of human
                        happiness. No one rejects, dislikes, or avoids pleasure
                        itself, because it is pleasure, but because those who do
                        not know how to pursue pleasure rationally encounter
                        consequences that are extremely painful. Nor again is
                        there anyone who loves or pursues or desires to obtain
                        pain of itself, because it is pain, but because
                        occasionally circumstances occur in which toil and pain
                        can procure him some great pleasure. To take a trivial
                        example, which of us ever undertakes laborious physical
                        exercise, except to obtain some advantage from it? But
                        who has any right to find fault with a man who chooses
                        to enjoy a pleasure that has no annoying consequences,
                        or one who avoids a pain that produces no resultant
                        pleasure? Section 1.10.33 of de Finibus Bonorum et
                        Malorum, written by Cicero in 45 BC At vero eos et
                        accusamus et iusto odio dignissimos ducimus qui
                        blanditiis praesentium voluptatum deleniti atque
                        corrupti quos dolores et quas molestias excepturi sint
                        occaecati cupiditate non provident, similique sunt in
                        culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio. Nam libero tempore, cum
                        soluta nobis est eligendi optio cumque nihil impedit quo
                        minus id quod maxime placeat facere possimus, omnis
                        voluptas assumenda est, omnis dolor repellendus.
                        Temporibus autem quibusdam et aut officiis debitis aut
                        rerum necessitatibus saepe eveniet ut et voluptates
                        repudiandae sint et molestiae non recusandae. Itaque
                        earum rerum hic tenetur a sapiente delectus, ut aut
                        reiciendis voluptatibus maiores alias consequatur aut
                        perferendis doloribus asperiores repellat. 1914
                        translation by H. Rackham On the other hand, we denounce
                        with righteous indignation and dislike men who are so
                        beguiled and demoralized by the charms of pleasure of
                        the moment, so blinded by desire, that they cannot
                        foresee the pain and trouble that are bound to ensue;
                        and equal blame belongs to those who fail in their duty
                        through weakness of will, which is the same as saying
                        through shrinking from toil and pain. These cases are
                        perfectly simple and easy to distinguish. In a free
                        hour, when our power of choice is untrammelled and when
                        nothing prevents our being able to do what we like best,
                        every pleasure is to be welcomed and every pain avoided.
                        But in certain circumstances and owing to the claims of
                        duty or the obligations of business it will frequently
                        occur that pleasures have to be repudiated and
                        annoyances accepted. The wise man therefore always holds
                        in these matters to this principle of selection: he
                        rejects pleasures to secure other greater pleasures, or
                        else he endures pains to avoid worse pains.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onConfirm}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onDecline}
                  ref={cancelButtonRef}
                >
                  Decline
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
