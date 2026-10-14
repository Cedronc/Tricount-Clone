# Tricount Mobile App --- Product and UX Replication Guide

## Purpose of this document

This document describes **what Tricount does, how people use it, and how
its mobile interface should feel and behave**. It is intended as a
product and user-experience brief for an AI recreating the app.

It deliberately avoids implementation details such as frameworks,
databases, APIs, data models, and algorithms. Focus on the experience
visible to a person using the app.

Tricount's exact interface can change between app versions, operating
systems, and regions. Treat the descriptions below as a comprehensive
guide to the product's core experience rather than a guarantee that
every screen is identical in every release.

------------------------------------------------------------------------

## 1. The core idea

Tricount helps a group of people keep track of shared spending without
needing to calculate debts themselves.

Imagine four friends going out: - Alex pays €80 for dinner. - Sam pays
€24 for drinks. - Noor pays €16 for a taxi. - Everyone participates in
all three expenses.

The app records each bill, who paid it, and who should share it. It then
works out each person's fair share and shows who has paid too much or
too little. When the group is ready, it suggests repayments that settle
the balances with as few confusing transactions as possible.

The important distinction is that **the person who paid a bill is not
necessarily the person who ultimately owes the whole bill**. The app
tracks the difference between money someone advanced and the share they
were responsible for.

Tricount is useful for: - Dinners, bars, cafés, and nights out. -
Holidays and weekend trips. - Shared taxis, tickets, accommodation, and
activities. - Roommates sharing rent, groceries, and household bills. -
Couples and families sharing recurring expenses. - Parties, events,
group gifts, and club activities.

The product should feel practical, friendly, quick, and reassuring. Its
purpose is to remove awkward mental arithmetic and arguments about who
paid what.

## 2. Main experience principles

1.  **A group has one shared record.** Everyone can see the expenses and
    balances relevant to the group.
2.  **Adding a bill should be quick.** A person should be able to record
    a purchase shortly after paying for it.
3.  **The app should make the details transparent.** People can inspect
    who paid, who participated, and how the amount was divided.
4.  **Balances should be easy to understand.** A person should quickly
    understand whether they are owed money or need to pay.
5.  **Repayments are separate from expenses.** Recording a dinner bill
    is not the same thing as recording the later repayment between
    friends.
6.  **Splits should be flexible.** Not every expense is shared equally
    by everyone.
7.  **The group should remain useful over time.** People may add bills
    across several days, join later, or settle some debts before the
    whole trip is over.

------------------------------------------------------------------------

## 3. The main areas of the app

### 3.1 Tricounts overview / home

This is the user's starting point and the place to find their groups.

The screen presents a list of expense groups, each representing a trip,
event, household, or other shared activity. A group is commonly referred
to as a **tricount**. They are either long running groups spanning multiple
years or short living groups for say one trip.

A group entry should communicate at a glance: - The group's name, such
as "Weekend in Amsterdam" or "Dinner with friends". - A small visual
identifier, often an emoji or icon. - Useful summary information, such
as the total spending or the user's balance, where available. - Whether
the group is active or archived, if that distinction is being shown.

The list should feel like a simple collection of ongoing activities
rather than a complicated financial dashboard. Names and visual
identifiers help users distinguish groups quickly.

**Primary action:** create a new tricount, usually through a prominent
plus button.

**Other expected actions:** - Open a group to view its expenses and
balances. - Create or edit a group's name and participants. - Invite or
share access with other participants. - Archive a finished group and
find it again later. - Open a group menu for secondary actions.

An empty home screen should explain the value of creating a group and
make the create action obvious. It should not leave the user wondering
what to do next.

### 3.2 Inside a tricount

Opening a group takes the user into its shared financial record.

The group view should make three things easy to find: 1. The expenses
that have been recorded. 2. The group's current financial balance. 3.
The action to add another transaction. 4. The total amount spent.

The experience commonly revolves around an **Expenses** view and a
**Balance** view. These are two different ways to understand the same
group.

-   **Expenses** answers: "What has been paid, and by whom?"
-   **Balance** answers: "After accounting for all shared spending and
    repayments, who owes money and who should receive it?"

The group name should remain visible enough that the user knows which
trip or event they are editing. The interface should make it easy to
switch between the expense list and the balance summary without losing
the context of the group.

A visible add action should be easy to reach, because adding expenses is
the most frequent activity.

------------------------------------------------------------------------

## 4. Creating a group

Creating a tricount starts a new shared expense record.

### Information to collect

-   **Group name:** a clear, human-readable title such as "Lisbon trip",
    "House groceries", or "Friday dinner".
-   **Participants:** the people whose shared expenses will be tracked.
-   **Currency:** the currency used to present the group's main totals.
    If multiple currencies are supported, users should be able to record
    foreign-currency expenses while still understanding the group's
    overall balance.
-   **Optional visual identity:** an emoji or similar small identifier
    can make the group easier to recognise.

Participants may be added during creation and, where allowed, later
through group editing.

### What the user should experience

1.  The user taps the create action.
2.  The app asks for a group name and the initial participants.
3.  The user can add or remove people before finishing.
4.  The user confirms the new group.
5.  The new group opens or appears in the group list, ready for expenses
    to be recorded.

Avoid turning group creation into a long setup wizard. A casual dinner
group should take only a short time to create.

### Sharing and joining

The group is collaborative. Everyone should be able to invite other
people or share a way for them to join. Invited members should be able
to recognise the group, identify themselves as the relevant participant,
and then view or contribute to the shared record. 

A person's identity in the group matters because the app needs to know
which participant's balance and expenses to show as "mine". The app
should make this selection clear and allow the user to correct it if
they chose the wrong participant.

------------------------------------------------------------------------

## 5. Recording an expense

This is the central workflow. A person has paid for something that one
or more group members should share, and they want to record it.

### 5.1 Information on an expense

An expense can include:

-   **Description:** what the money was spent on, such as "Dinner",
    "Drinks at the bar", "Taxi to hotel", or "Groceries".
-   **Amount:** the total paid for the purchase.
-   **Payer:** the participant who actually paid the bill.
-   **Participants included in the split:** the people who should bear
    some or all of the cost.
-   **Split method:** equal, percentage or custom, depending on the
    situation.
-   **Date:** when the purchase happened.
-   **Category or emoji:** if available, to make the expense easier to
    scan in the list.

The description and amount should be visually prominent. The payer and
included participants should be easy to inspect and change before
saving.

### 5.2 Typical add-expense flow

1.  The user opens the correct tricount.
2.  They tap the add button.
3.  A form appears for the expense details.
4.  They enter a description and amount.
5.  They choose who paid.
6.  They choose who shares the cost.
7.  They review or customise the split if necessary.
8.  They save the expense.
9.  The new expense appears in the shared list and the balances update.

The form should minimise unnecessary steps. For a simple bill, the user
should be able to enter the amount, confirm the payer and participants,
and save without needing to understand accounting.

### 5.3 Payer selection

The payer is the person who handed over the money or whose payment
method was charged. It is not automatically the person who created the
expense.

The current user's selected participant can be the default payer to save
time, but it must remain easy to change. This is important when someone
records a bill on behalf of a friend.

The saved expense should clearly show who paid. Do not imply that every
participant paid an equal amount merely because they share the expense.

### 5.4 Choosing who participates

Not every expense belongs to every person in the group.

Examples: - Six friends share a restaurant bill. - Only three friends
share a taxi. - Two people split a hotel room while the others stay
elsewhere. - One person buys a drink only for themselves. - Four people
share groceries, but a fifth group member is not present that day.

The user should be able to include or exclude participants directly. A
selected person is part of the split; an unselected person is not
responsible for that expense.

The interface should make the selection state unmistakable, ideally
through clear checkmarks, selected avatars, or equivalent controls.

### 5.5 Equal splits

An equal split divides the expense evenly among the selected
participants.

For example, a €60 bill shared by three people means each participant is
responsible for €20. If one person paid the full €60, that person has
advanced the other two people's shares.

When the amount cannot be divided into perfectly equal cents, the app
should distribute the rounding difference fairly and transparently. The
individual shares should add up to the original amount.

### 5.6 Unequal and custom splits

Equal splitting is not always fair. The app should support custom shares
so that each person is assigned the appropriate portion of the bill.

Examples: - Friends ordered meals at different prices. - One person did
not drink alcohol. - Roommates pay different portions of a shared
cost. - One participant covers a larger agreed share.

The user should be able to specify individual amounts or otherwise
customise the allocation. The interface should make the resulting share
for each participant visible and make it clear if the entered shares do
not yet add up to the full expense.

A custom split should remain understandable: the person adding the
expense needs to know exactly how much each participant is being charged
before saving.

### 5.7 Editing, deleting, and inspecting an expense

Users should be able to open an expense to inspect its full details.
Depending on permissions and the app's rules, they should be able to
edit incorrect information or delete an expense that was entered by
mistake. Only the original payer should be able to edit that expense.

Editing an expense may affect the balances of several participants, so
the app should refresh the displayed totals and balances after the
change.

Deletion should be deliberate rather than too easy to trigger
accidentally. A confirmation is appropriate when deleting a saved
transaction.

------------------------------------------------------------------------

## 6. The shared expense list

The expense list is the group's chronological ledger: a readable history
of the purchases and other transactions recorded in the tricount.

Each row should be scannable without opening it. It can show: - A short
description. - A date or time indicator. - A category icon or emoji, if
used. - The amount. - Who paid. - Helpful split or participant context,
where the interface has room.

For example, a user should be able to distinguish "Dinner --- €80 ---
paid by Alex" from "Taxi --- €16 --- paid by Noor" at a glance.

### List behaviour

-   New transactions should appear in a predictable chronological order.
-   Opening a row should reveal its full details.
-   The list should refresh as group members add or edit expenses.
-   Users should be able to browse older entries without losing the
    current group context.
-   If the list is empty, explain that expenses will appear here once
    someone adds one.
-   If there are many entries, the layout should still make individual
    transactions easy to scan.

### Totals

The group view can display both a **group expense total** and a
**personal total**.

-   **Group expenses total:** the sum of the group's expense amounts.
-   **My total:** the sum of expenses that affect the selected
    participant, according to the app's definition.

These are not necessarily the same number. For example, a group might
have spent €1,000 in total while the current user participated in only
€350 worth of expenses.

Repayments should not be confused with spending totals. A repayment
moves money between participants; it does not mean the group bought
something new.

------------------------------------------------------------------------

## 7. Understanding balances

The Balance view is where the app explains the result of all recorded
expenses and repayments.

Each participant has a net position: - **Owed money / should receive:**
they have paid more than their own share of the group expenses, after
accounting for recorded repayments. - **Owes money / should pay:** they
have paid less than their own share and need to reimburse others. -
**Settled / balanced:** their position is approximately zero.

Use plain language and clear signs or labels. A positive or negative
number alone is not enough if the meaning is ambiguous. The screen
should explain whether the person is owed money or owes money.

### What a participant's balance means

The balance is not simply the amount that person spent, nor is it simply
the amount of cash they paid at restaurants. It is the net difference
between: - The amount they have covered for the group. - The amount of
the expenses they are responsible for. - Any repayments already
recorded.

A person can have paid for several bills and still owe money overall.
Another person might never have paid at the restaurant but could be owed
money because they covered another group expense earlier.

### Example

Three friends --- Alex, Sam, and Noor --- share a €90 dinner equally.

-   Alex pays the full €90.
-   Alex's fair share is €30.
-   Sam's fair share is €30.
-   Noor's fair share is €30.

After this expense: - Alex should receive €60 from the others. - Sam
owes €30. - Noor owes €30.

If Sam later pays Alex €30 and Noor pays Alex €30, everyone is settled
for that dinner.

The app should make this relationship easy to understand without
requiring users to calculate the individual shares themselves.

### Suggested repayments may not mirror individual bills

The app can recommend repayments that simplify the group's overall
balances. A participant may be told to pay someone they did not directly
share a particular bill with.

That is not necessarily an error. The app is settling the group's
combined balance, not reconstructing a separate repayment for every
restaurant receipt. The important requirement is that the final set of
suggested repayments clears the outstanding balances fairly.

### Rounding

Money is handled to the smallest relevant currency unit, usually cents.
Where an equal division creates a fraction of a cent, one participant
may have a share that differs by one cent so the shares add up exactly
to the bill. The interface should present these differences as normal
rounding, not as unexplained errors.

------------------------------------------------------------------------

## 8. Settling up and recording repayments

Once people are ready to pay each other back, Tricount provides a clear
view of the suggested repayments.

A settlement view should answer: - Who needs to pay? - Who should
receive the money? - How much should be paid? - Has the repayment been
recorded as completed?

A suggested repayment is a direction for money to move between two
participants. It does not automatically mean the app has transferred the
money. Unless an actual payment feature is explicitly used, the people
may still need to pay one another through their normal banking or
payment app.

This flow is not meant to be used often as the wanted flow is just 
everyone adding their paid bills and letting the person who is most in debt
pay the next bill.

### Suggested repayment flow

1.  The user opens the Balance or settlement area.
2.  The app shows the outstanding balances.
3.  It lists suggested repayments, with a payer, recipient, and amount
    for each.
4.  The user can understand the proposed payments and act on them.
5.  When money has actually been repaid, the relevant transfer can be
    recorded or marked as completed.
6.  The balances update to reflect the repayment.

The experience should make the distinction between **suggested**,
**requested**, and **completed** payments clear.


### Recording a transfer manually

A transfer records money moving between participants to settle an
existing balance.

It should identify: - The person who sent the money. - The person who
received it. - The amount. - The date, if applicable.

It should not be treated as a new restaurant, taxi, or shopping expense.
The transfer changes what participants owe one another; it does not
increase the group's spending total.

------------------------------------------------------------------------

## 9. Other transaction types

Tricount supports more than ordinary expenses. The interface should
distinguish the following concepts.

### Expense

Money spent by a participant for the group or for a subset of its
members. It contributes to group spending and is split among the
relevant participants.

### Transfer

Money one participant pays another participant to settle a debt. It
affects balances but is not a new shared purchase.

------------------------------------------------------------------------

## 10. Multiple currencies

For travel and international groups, expenses may be paid in different
currencies while the group still needs one understandable overall
balance.

The user should be able to: - Choose or view the currency of an
expense. - Enter the amount in that currency. - See the amount converted
into the group's main currency when conversion is supported. -
Understand which currency is being displayed. - Review the overall group
balance in a consistent currency.

Currency symbols and codes should be unambiguous. For example, do not
display an unexplained bare "\$" when the distinction between currencies
matters.

When exchange-rate conversion is involved, the app should communicate
the converted value clearly enough that users can understand how the
foreign-currency purchase affects the group total.


------------------------------------------------------------------------

## 12. Shared access and synchronisation

A tricount is a collaborative group record, not just a private
calculator on the creator's phone.

Participants should be able to view the latest shared expenses and
balances and, where permitted, add their own expenses. When another
member records a bill, the other members should eventually see the
updated record and balances.

The interface should provide sensible feedback when an action is being
saved or when a change cannot be synchronised. Avoid showing stale
balances as though they are definitely current.

Tricount supports offline expense tracking in its advertised feature
set. When the user is offline, they should still be able to record
relevant details where supported, and those changes should synchronise
when connectivity returns. The experience should make any pending or
unsynchronised state understandable without alarming the user.

The app also supports a shared group on multiple mobile platforms. The
core experience should remain recognisable even if small visual
differences exist between iOS and Android.

------------------------------------------------------------------------

## 13. Insights and spending overview

For groups with many transactions, spending insights help users
understand where the money went.

Possible information includes: - Total group spending. - Spending over
time. - Categories or types of spending. - A personal view of the
expenses affecting the current participant. - A summary useful for
planning the remainder of a trip or event.

Insights should answer practical questions such as "How much have we
spent so far?" and "What are the biggest costs?" They should support the
expense list, not replace it. A user must still be able to open
individual transactions to understand the figures.

Do not confuse a spending chart with a balance chart: spending describes
purchases; balances describe who owes whom.

------------------------------------------------------------------------

## 14. Editing group details and managing participants

The group creator or an authorised participant should be able to manage
group details, subject to the app's rules.

Expected group-management actions include: - Rename the tricount. -
Change its visual identifier, such as an emoji, where available. - Add
participants. - Correct participant details or remove a participant
where permitted. - Share or manage invitations. - Archive a finished
tricount. - Restore an archived tricount. - Delete a group where
supported and after an appropriate confirmation (In database set
active to false).

Participant changes need to be handled carefully. If a person is added
after expenses already exist, the app should not silently make that
person responsible for every past expense. The people included in each
expense should remain understandable.

Archiving is useful when a trip or event is over but the group wants to
preserve its record. An archived group should be out of the way without
being confused with a deleted group.

------------------------------------------------------------------------

## 15. Visual design and interaction style

This section describes the desired visual character rather than
prescribing exact pixel measurements.

### Overall appearance

The app should look like a modern, approachable consumer finance tool: -
Clean, uncluttered screens. - Clear hierarchy between titles, totals,
labels, and secondary details. - Comfortable spacing and touch
targets. - Rounded cards, controls, or surfaces where appropriate to the
visual style. - Readable typography and strong contrast. - Simple icons
or emojis to help identify groups and expenses. - A restrained use of
colour to distinguish states without making the screen noisy.

The interface should feel casual enough for friends at a bar, but
precise enough that people trust it with money.

### Colour and status

Use colour to reinforce meaning, not as the only way to communicate it.

-   Amounts and balances should be easy to locate.
-   "Owes" and "is owed" states should be visually distinguishable.
-   Completed and pending repayment states should be different.
-   Selected participants should be unmistakable.
-   Error or incomplete states should explain what the user needs to
    fix.

Always include a text label, sign, or other cue alongside colour when a
financial meaning matters.

### Navigation

Keep the main tasks obvious: - Find a group. - Open its expenses. -
Switch to balances. - Add a transaction. - Inspect or edit a
transaction. - Review or record repayments.

Secondary actions such as archiving, renaming, and managing participants
belong in a menu or group settings area rather than competing with the
primary tasks.

### Forms and controls

Forms should use plain labels and sensible defaults. Amount fields
should be easy to edit, numeric entry should be convenient, and the
currency should be visible. Participant selection should show names
clearly and indicate selected people. The user should always be able to
review the result before committing an unusual or custom split.

### Feedback

After a successful save, show the new expense or transaction in the
relevant view and update the totals. If something goes wrong, explain it
in plain language and preserve what the user entered where possible.

Avoid unnecessary confirmation dialogs for routine actions. Reserve them
for destructive or financially consequential actions.

### Accessibility and usability

-   Use readable text sizes.
-   Ensure interactive controls are easy to tap.
-   Do not rely on colour alone.
-   Make the meaning of balances explicit.
-   Support long names and large amounts without clipping important
    information.
-   Keep the most common actions easy to reach on a phone.
-   Use clear empty states and understandable error messages.

------------------------------------------------------------------------

## 16. Important user journeys to reproduce

### Journey A: Split a restaurant bill

1.  A person creates a group called "Dinner".
2.  They add the friends who are participating.
3.  One friend pays the €120 bill.
4.  They record "Restaurant", €120, the payer, and the participants.
5.  They choose an equal split between four people.
6.  The expense appears in the list.
7.  The balance view shows how the payment affects each person's net
    position.
8.  Later, the group reviews the suggested repayments and records the
    payments as they happen.

**What matters:** the expense is quick to enter, the split is visible,
and the app handles the arithmetic.

### Journey B: Drinks at a bar, paid by different people

1.  The group records €36 of drinks paid by Alex and shared by three
    people.
2.  Later, Sam pays €24 for another round shared by a different subset
    of the group.
3.  The group records both expenses separately.
4.  Each expense shows its own payer and participants.
5.  The balance view combines both transactions to show the net
    position.

**What matters:** separate bills remain separate records, but the
balances reflect them together.

### Journey C: Unequal restaurant order

1.  One person pays a €100 bill.
2.  The group members did not all order equally.
3.  The person adding the expense selects the participants and
    customises their shares.
4.  They review each person's amount and ensure the total matches €100.
5.  They save the expense.
6.  The balances use the custom shares rather than an equal split.

**What matters:** the app supports fairness without making the user do
mental arithmetic.

### Journey D: One participant misses an activity

1.  A group of six is tracking a weekend trip.
2.  Four people take a €40 taxi.
3.  The user adds the expense and selects only those four participants.
4.  The other two remain part of the overall group but are not charged
    for this taxi.
5.  The group's balances update accordingly.

**What matters:** membership in the group does not mean participation in
every expense.

### Journey E: Settle a balance

1.  Several expenses have accumulated.
2.  The user opens Balance.
3.  The app displays each participant's net position and the proposed
    repayments.
4.  A participant pays another through their normal payment method.
5.  The transfer is recorded or marked completed.
6.  The balance view reflects the payment and shows what remains
    outstanding.

**What matters:** the user can tell the difference between a suggested
repayment and money that has actually been paid.

### Journey F: Correct a mistake

1.  Someone enters the wrong amount or selects the wrong payer.
2.  They open the transaction details.
3.  They edit the incorrect field or delete the erroneous entry.
4.  The expense list and balances update.
5.  Other participants can see the corrected shared record.

**What matters:** mistakes are recoverable and their effect on balances
is reflected clearly.

### Journey G: Finish a trip

1.  The group records expenses throughout the trip.
2.  Members review total spending and outstanding balances.
3.  They make and record repayments.
4.  When the group no longer needs the tricount in the active list, it
    can be archived.
5.  The record remains available for reference if the app supports
    restoring archived groups.

**What matters:** the record can be closed out without losing useful
history.

------------------------------------------------------------------------

## 17. Rules and edge cases that must remain understandable

-   **A payer can be included in the split.** Paying the full bill does
    not mean they owe the full bill to themselves.
-   **The payer and participants are separate choices.** The payer is
    who paid; participants are who share the cost.
-   **Not everyone in a group must share every expense.**
-   **Custom splits must add up to the expense amount.** If they do not,
    show the mismatch before saving.
-   **Small rounding differences can occur.** Ensure the shares total
    the original amount.
-   **Repayments are not expenses.** They should not inflate the group
    spending total.
-   **Income is not a repayment.** It represents money received for the
    group and should be identified separately.
-   **A person may owe someone they did not directly share a particular
    bill with.** The balance view reflects the group's combined
    transactions.
-   **A zero balance does not mean a person spent nothing.** It means
    their net position is settled.
-   **Changing an old expense can change several people's balances.**
-   **An archived group is not the same as a deleted group.**
-   **Foreign currency and group currency should never be ambiguous.**
-   **A payment request is not proof of payment.** Pending and completed
    states must be distinct.
-   **The app should be clear about which participant represents the
    current user.** A wrong identity selection can make "my total" and
    "my balance" misleading.
-   **The group expense total and a participant's personal total answer
    different questions.** Label them clearly.

------------------------------------------------------------------------

## 18. Suggested screen inventory

Use this as a checklist of the visible screens and states a faithful
recreation should cover.

1.  **Home / tricount list** --- active groups, group summaries, create
    action, archived groups.
2.  **Create group** --- name, participants, currency or relevant group
    options, confirmation.
3.  **Group expenses** --- transaction list, spending totals, add
    action, access to balances.
4.  **Group balance** --- participant net positions, amounts owed and
    receivable, suggested repayments.
5.  **Add expense** --- description, amount, payer, participants, split
    choice, date and optional details.
6.  **Custom split** --- individual shares, editable amounts, total
    validation.
7.  **Expense details** --- complete transaction information, notes or
    attachments, edit and delete actions.
8.  **Add transfer / repayment** --- sender, recipient, amount, and
    date.
9.  **Add income** --- amount, description, recipient or relevant group
    details.
10. **Repayment requests** --- requests, recipients, amounts, and
    pending/completed states where supported.
11. **Group settings** --- rename, participants, visual identifier,
    sharing, archive, restore, and delete actions where available.
12. **Insights** --- group totals, personal totals, trends, and category
    summaries where available.
13. **Empty states** --- no groups, no expenses, or no outstanding
    balances.
14. **Offline / sync feedback** --- understandable indication of pending
    changes or failed synchronisation where relevant.
15. **Currency selection or conversion detail** --- clear currency
    labels and converted amounts where multi-currency support is
    available.

This is a product screen checklist, not a claim that every item is a
separate top-level tab in the current app.

------------------------------------------------------------------------

## 19. What a successful recreation should achieve

A person who has never used the app should be able to:

-   Create a group for a dinner, trip, or shared household.
-   Add the right participants.
-   Record who paid each bill.
-   Select exactly who shares each bill.
-   Split bills equally or assign custom shares.
-   Review all expenses in a readable shared list.
-   Understand the difference between group spending and their own
    share.
-   See clearly who owes money and who should receive it.
-   Understand why a suggested repayment may be between two people who
    did not share one specific bill.
-   Record a repayment without treating it as new spending.
-   Correct mistakes and see balances update.
-   Keep a group organised until it is settled, then archive it if
    desired.

The guiding principle is simple: **Tricount turns a pile of shared
receipts and informal promises into a transparent group record with
clear balances and practical repayment suggestions.** The interface
should make that process feel quick, fair, and easy to trust.

------------------------------------------------------------------------

## 20. Public references

These sources describe Tricount's advertised features and help validate
the product scope. The recreation should prioritise the behavioural
description in this document and treat the live app as the authority for
exact current visuals.

-   [Tricount --- Official website](https://www.tricount.com/)
-   [Tricount --- Group expense
    tracking](https://www.tricount.com/features/group-expense-tracking)
-   [Tricount --- Feature overview](https://www.tricount.com/features)
-   [Tricount Help ---
    FAQs](https://help.tricount.com/articles/tricount-faqs)
-   [Tricount Help --- Managing tricounts and
    expenses](https://help.tricount.com/en/articles/how-can-i-manage-my-tricounts-and-expenses)
-   [Tricount on the Belgian App
    Store](https://apps.apple.com/be/app/tricount-split-settle-bills/id349866256)
